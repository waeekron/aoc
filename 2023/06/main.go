package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

/*
Time:      7  15   30
Distance:  9  40  200
*/

type Boat struct {
	speed int
}

func (b *Boat) holdButton(ms int) {
	b.speed = ms
}

func (b Boat) travel(ms int) int {
	return b.speed * ms
}

func main() {
	bytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic("No input")
	}
	content := string(bytes)
	// parse input
	parts := strings.Split(content, "\n")
	part1(parts)
	part2(parts)
}
func part2(parts []string) {
	t := strings.Split(strings.TrimSpace(strings.Split(parts[0], ":")[1]), " ")
	d := strings.Split(strings.TrimSpace(strings.Split(parts[1], ":")[1]), " ")
	times, err := combine(t)
	if err != nil {
		panic(err)
	}

	distances, err := combine(d)
	if err != nil {
		panic(err)
	}
	fmt.Print("Part 2\t")
	race(times, distances)
}

// [1, 2, 4] -> [124]
func combine(a []string) ([]int, error) {
	var n string
	for _, s := range a {
		n += s
	}
	num, err := strconv.Atoi(n)
	if err != nil {
		return []int{0}, err
	}
	return []int{num}, nil
}
func race(times, distances []int) {
	count := 1

	for i := 0; i < len(times); i++ {
		t := times[i]
		d := distances[i]
		waysToWin := 0

		boat := new(Boat)
		tick := 0
		for boat.speed < t {
			boat.holdButton(tick)
			if boat.travel(t-tick) > d {
				waysToWin++
			}

			tick++

		}
		count *= waysToWin
	}
	fmt.Println("Count of ways to win", count)
}
func part1(parts []string) {

	t := strings.Split(strings.TrimSpace(strings.Split(parts[0], ":")[1]), " ")
	d := strings.Split(strings.TrimSpace(strings.Split(parts[1], ":")[1]), " ")
	times := convStr(t)
	distances := convStr(d)
	fmt.Print("Part 1\t")
	race(times, distances)
}

func convStr(s []string) []int {
	var a []int
	for i := range s {
		num, err := strconv.Atoi(s[i])
		if err != nil {
			continue
		}
		a = append(a, num)
	}
	return a
}
