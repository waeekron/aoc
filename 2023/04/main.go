package main

import (
	"bufio"
	"fmt"
	"golang.org/x/exp/slices"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

type Ticket struct {
	winning_numbers, scratched_numbers []int
	id                                 int
}

func (t Ticket) String() string {
	return fmt.Sprintf("Id: %d\n winning numbers:%v\n scratched numbers: %v\n\n", t.id, t.winning_numbers, t.scratched_numbers)

}

func main() {
	ticketCount := 0
	sumOfPoints := 0.0
	tickets := make([]Ticket, 0)
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	sc := bufio.NewScanner(f)
	idx := 1
	// parse input
	for sc.Scan() {
		nums := strings.Split(strings.Split(sc.Text(), ":")[1], "|")
		//fmt.Println(nums)

		// parsing winning nums
		wn := strings.Split(nums[0], " ")
		var wnSlice []int
		for _, n := range wn {
			i, err := strconv.Atoi(n)

			if err == nil {
				wnSlice = append(wnSlice, i)
			}
		}

		// parsing scratched nums
		sn := strings.Split(nums[1], " ")
		var snSlice []int
		for _, n := range sn {
			if i, err := strconv.Atoi(n); err == nil {
				snSlice = append(snSlice, i)
			}
		}
		t := Ticket{wnSlice, snSlice, idx}
		idx++
		tickets = append(tickets, t)
	}

	// compute parsed tickets
	idToCount := make(map[int]int)
	// part 1
	for _, t := range tickets {
		c := countMatches(t.winning_numbers, t.scratched_numbers)
		// part 1
		if c == 0 {
			continue
		}
		if c == 1 {
			sumOfPoints++
		} else {
			sumOfPoints += math.Pow(2.0, float64(c-1))
		}
		idToCount[t.id] = c

	}
	fmt.Printf("Part 1: %g\n", sumOfPoints)

	// part 2
	end := len(tickets)
	for i, t := range tickets {
		subwidth := 0
		if i+idToCount[t.id] > end {
			subwidth = int(math.Abs(float64(end) - float64(i+idToCount[t.id])))
		} else {
			subwidth = i + idToCount[t.id]
		}
		//subwidth :=i+idToCount[t.id]
		c := countTickets(tickets[i+1:subwidth+1], idToCount, end)
		ticketCount += c
	}

	fmt.Printf("Part 2: %d\n", ticketCount)
}

func countTickets(tickets []Ticket, idToCount map[int]int, end int) int {

	if len(tickets) == 0 {
		return 1
	}
	c := 1
	for i, t := range tickets {
		subwidth := 0
		if t.id > end {
			subwidth = int(math.Abs(float64(end) - float64(i+idToCount[t.id])))
		} else {
			subwidth = i + idToCount[t.id]
		}
		c += countTickets(tickets[i+1:subwidth+1], idToCount, end)
	}
	return c
}

// Counts how many elements of a1 are included in a2 and returns count
func countMatches(a1, a2 []int) (c int) {
	for _, el := range a1 {
		if slices.Contains(a2, el) {
			c++
		}
	}
	return
}
