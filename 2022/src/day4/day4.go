package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	file, err := os.Open("input4.txt")
	check(err)

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		slices := strings.Split(line, ",")
		r1, r2 := strings.Split(slices[0], "-"), strings.Split(slices[1], "-")
		fmt.Println(r1, r2)

	}
	fmt.Print("Hello world!")
}
