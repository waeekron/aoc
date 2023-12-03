package main

import (
	"bytes"
	_ "embed"
	"errors"
	"fmt"
	"strconv"
)

//go:embed input.txt
var input []byte

type Coordinate struct {
	X, Y int
}

func main() {

	gears := make(map[Coordinate][]bytes.Buffer)
	schematic := bytes.Split(input, []byte("\n"))
	asterisks := make([]Coordinate, 0)
	//tmp := make([]byte, 0)
	//for i := 0; i < len(input); i++ {
	//	if string(input[i]) == "\n" {
	//		schematic = append(schematic, bytes.TrimSpace(tmp))
	//		tmp = make([]byte, 0)
	//	}
	//	tmp = append(tmp, input[i])
	//}

	// find the numbers and their indexes, then check there is a symbol which touches
	// at least one of the number's indices
	sum := 0
	fmt.Println("BEFORE LOOPIN")
	for i := 0; i < len(schematic); i++ {
		fmt.Println("iterating over", string(schematic[i]), i)
		for j := 0; j < len(schematic[i]); j++ {
			if j == 0 {
				//fmt.Println("SECOND LOOP STARTS AN ITERATION")
			}
			var num bytes.Buffer
			var num_indices []int
			s := string(schematic[i][j])
			_, err := strconv.Atoi(s)

			if err != nil {
				if "*" == string(schematic[i][j]) {
					asterisks = append(asterisks, Coordinate{i, j})
				}
			} else {
				// find the start and end of the number
				a := schematic[i]
				//fmt.Println("first number found starting to look for others", b, "from j index", j, string(a))
				// the number and its index
				num_indices = append(num_indices, j)
				num.WriteByte(schematic[i][j])
				for k := j + 1; k < len(a); k++ {
					num_candidate := a[k]
					// check if it is a number
					_, err := strconv.Atoi(string(num_candidate))
					if err != nil {
						j = k
						break
					}
					num_indices = append(num_indices, k)
					num.WriteByte(a[k])
				}

				// now that we have found the number and its indices, we need to check if there is a symbol touching it
				// touching if: a[i+1][j] a[i-1][j] a[i][j+1] a[i][j-1] a[i+1][j+1] a[i+1][j-1] a[i-1][j+1] a[i-][j-1]
				// tämä kertoo millä rivillä ollaan, eli sitä voidaan ajatella y-akselina.
				y := i
				numStr := num.String()
				n, err := strconv.Atoi(numStr)
				if err != nil {
					panic("num buffer is not a number")
				}
				w := len(schematic[i]) - 1
				for _, x := range num_indices {
					// cannot check y-1/up
					// check if number touches a gear
					// left
					if c, e := checkAdjecant(schematic, y, x-1); e == nil {
						gears[c] = append(gears[c], num)
					}
					// up
					if c, e := checkAdjecant(schematic, y-1, x); e == nil {
						gears[c] = append(gears[c], num)
					}
					// right
					if c, e := checkAdjecant(schematic, y, x+1); e == nil {
						gears[c] = append(gears[c], num)
					}
					// down
					if c, e := checkAdjecant(schematic, y+1, x); e == nil {
						gears[c] = append(gears[c], num)
					}

					// upleft
					if c, e := checkAdjecant(schematic, y-1, x-1); e == nil {
						gears[c] = append(gears[c], num)
					}
					// upright
					if c, e := checkAdjecant(schematic, y-1, x+1); e == nil {
						gears[c] = append(gears[c], num)
					}
					// downleft
					if c, e := checkAdjecant(schematic, y+1, x-1); e == nil {
						gears[c] = append(gears[c], num)
					}
					// down right
					if c, e := checkAdjecant(schematic, y+1, x+1); e == nil {
						gears[c] = append(gears[c], num)
					}
					if y == 0 {
						// cannot check x-1
						if x == 0 {

							// can check down and right and downright
							// right
							if isSymbol(schematic[y][x+1]) {
								add(&sum, n)
								break
							}
							// rightdown
							if isSymbol(schematic[y+1][x+1]) {
								add(&sum, n)
								break
							}
							// down
							if isSymbol(schematic[y+1][x]) {
								add(&sum, n)
								break
							}
						} else if x == w {
							// cannot check right

							// left
							if isSymbol(schematic[y][x-1]) {
								add(&sum, n)
								break
							}
							// down
							if isSymbol(schematic[y+1][x]) {
								add(&sum, n)
								break
							}
							// downleft
							if isSymbol(schematic[y+1][x-1]) {
								add(&sum, n)
								break
							}
						} else {
							// we can check every direction except for up
							// left
							if isSymbol(schematic[y][x-1]) {
								add(&sum, n)
								break
							}
							// right
							if isSymbol(schematic[y][x+1]) {
								add(&sum, n)
								break
							}
							// down
							if isSymbol(schematic[y+1][x]) {
								add(&sum, n)
								break
							}
							// downleft
							if isSymbol(schematic[y+1][x-1]) {

								add(&sum, n)
								break
							}
							// downright
							if isSymbol(schematic[y+1][x+1]) {
								add(&sum, n)
								break
							}
						}
					}
					if y == len(schematic)-1 {
						// cannot check y+1

						if x == 0 {
							// can check up and right and upright
							// right
							if isSymbol(schematic[y][x+1]) {
								add(&sum, n)
								break
							}
							// upright
							if isSymbol(schematic[y-1][x+1]) {
								add(&sum, n)
								break
							}
							// up
							if isSymbol(schematic[y-1][x]) {
								add(&sum, n)
								break
							}
						} else if x == w {
							// cannot check right

							// left
							if isSymbol(schematic[y][x-1]) {
								add(&sum, n)
								break
							}
							// up
							if isSymbol(schematic[y-1][x]) {
								add(&sum, n)
								break
							}
							// upleft
							if isSymbol(schematic[y-1][x-1]) {
								add(&sum, n)
								break
							}
						} else {
							// we can check every direction except for down
							// left
							if isSymbol(schematic[y][x-1]) {
								add(&sum, n)
								break
							}
							// right
							if isSymbol(schematic[y][x+1]) {
								add(&sum, n)
								break
							}
							// up
							if isSymbol(schematic[y-1][x]) {
								add(&sum, n)
								break
							}
							// upleft
							if isSymbol(schematic[y-1][x-1]) {
								add(&sum, n)
								break
							}
							// upright
							if isSymbol(schematic[y-1][x+1]) {
								add(&sum, n)
								break
							}
						}

					}
					if y > 0 && y < len(schematic)-1 && x >= 0 && x < w {
						// can check every direction
						fmt.Println("IN ALL CHECK", y, x)
						if y == 120 {
							fmt.Println("CHECKPOINT")
						}
						// left
						fmt.Println("in correct check with values ", y, x)
						if x-1 > 0 && isSymbol(schematic[y][x-1]) {
							add(&sum, n)
							break
						}
						// right
						if x+1 < w && isSymbol(schematic[y][x+1]) {
							fmt.Println("interesting case")
							add(&sum, n)
							break
						}
						// up
						if isSymbol(schematic[y-1][x]) {
							add(&sum, n)
							break
						}
						// upleft
						if x-1 > 0 && isSymbol(schematic[y-1][x-1]) {
							add(&sum, n)
							break
						}
						// upright
						if x+1 < w && isSymbol(schematic[y-1][x+1]) {
							add(&sum, n)
							break
						}
						// down
						if isSymbol(schematic[y+1][x]) {
							add(&sum, n)
							break
						}
						// downleft
						if x-1 > 0 && isSymbol(schematic[y+1][x-1]) {
							add(&sum, n)
							break
						}
						// downright
						if x+1 < w && isSymbol(schematic[y+1][x+1]) {
							add(&sum, n)
							break
						}
					}

				}
				fmt.Println(num.String(), num_indices, "num as string and num indeces")

			}

		}
	}
	fmt.Println(sum, "sum is")
	fmt.Println(gears)
	//sum2 := 0
	//gears := make(map[Coordinate]int[])
	//for _, c := range asterisks {

	//}
	sum2 := 0
	for c, nums := range gears {
		fmt.Println(c, nums)
		if len(nums) == 2 {
			n1, n2 := nums[0], nums[1]
			i1, _ := strconv.Atoi(n1.String())
			i2, _ := strconv.Atoi(n2.String())
			sum2 += i1 * i2
		}
	}

	fmt.Println(sum2)
}

func checkAdjecant(a [][]byte, y int, x int) (Coordinate, error) {
	if y < len(a) && y >= 0 && x >= 0 && x < len(a[y]) {
		if string(a[y][x]) == "*" {
			return Coordinate{X: x, Y: y}, nil
		}
	} else {
		return Coordinate{}, errors.New("Index out of bounds")
	}
	return Coordinate{}, errors.New("No asterisk")
}
func add(sum *int, num int) {
	fmt.Println("adding", num)
	*sum += num
}
func isSymbol(b byte) bool {

	s := string(b)

	_, err := strconv.Atoi(s)
	if err == nil {
		return false
	}

	if s == "." {
		return false
	}
	return true
}
