package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := os.ReadFile("input.txt")

	if err != nil {
		panic(err)
	}

	input := string(data)
	lines := strings.Split(input, "\n")
	sum := 0
	s := 0
	for _, v := range lines {
		leftVal := left(v)
		rightVal := right(v)

		if leftVal != 0 && rightVal != 0 {
			tmp := strconv.Itoa(leftVal) + strconv.Itoa(rightVal)
			tmp2, _ := strconv.Atoi(tmp)
			s += tmp2
		}

		if leftVal == 0 {

			tmp := strconv.Itoa(rightVal) + strconv.Itoa(rightVal)
			tmp2, _ := strconv.Atoi(tmp)
			s += tmp2
		}

		if rightVal == 0 {
			tmp := strconv.Itoa(leftVal) + strconv.Itoa(leftVal)
			tmp2, _ := strconv.Atoi(tmp)
			s += tmp2
		}

		nums := make([]int, 0)
		for _, char := range v {
			if i, err := strconv.Atoi(string(char)); err == nil {
				nums = append(nums, i)
			}
		}

		if len(nums) == 1 {
			s := strconv.Itoa(nums[0])
			s += s
			i, _ := strconv.Atoi(s)
			sum += i
		}

		if len(nums) > 1 {
			s := strconv.Itoa(nums[0])
			s2 := strconv.Itoa(nums[len(nums)-1])
			s += s2
			i, _ := strconv.Atoi(s)
			sum += i
		}
	}

	fmt.Println(sum, s)
}

func left(s string) int {
	occurances := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	nums := []string{"1", "2", "3", "4", "5", "6", "7", "8", "9"}
	m := map[string]int{"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
	for idx := 0; idx < len(s); idx++ {
		for _, v := range nums {
			if strings.Contains(s[:idx], v) {
				i, _ := strconv.Atoi(v)
				return i
			}
		}
		for _, v := range occurances {
			if strings.Contains(s[:idx], v) {
				i, _ := m[v]
				return i
			}
		}
	}
	return 0
}
func right(s string) int {
	occurances := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	nums := []string{"1", "2", "3", "4", "5", "6", "7", "8", "9"}
	m := map[string]int{"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
	for idx := len(s) - 1; idx > 0; idx-- {
		for _, v := range nums {
			if strings.Contains(s[idx:], v) {
				i, _ := strconv.Atoi(v)
				return i
			}
		}
		for _, v := range occurances {
			if strings.Contains(s[idx:], v) {
				i, _ := m[v]
				return i
			}
		}
	}
	return 0
}
