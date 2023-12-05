package main

import (
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatal("Something went wrong")
	}
	lines := strings.Split(string(dat), "\r\n\r\n")
	seeds := strings.Split(strings.TrimSpace(strings.Split(lines[0], ":")[1]), " ")
	fmt.Println(len(seeds))
	s := convToInts(seeds)
	lowestLocation := int64(math.MaxInt64)
	s = parseSeeds(s)
	fmt.Println(s)
	for _, seed := range s {
		fmt.Println("Seed", seed)
		source := seed
		for _, l := range lines[1:] {

			parts := strings.Split(l, "\n")[1:]
			for _, p := range parts {
				m := convToInts(strings.Split(p, " "))
				d, s, rl := m[0], m[1], m[2]

				//dEnd := d + rl
				sEnd := s + rl
				/*
					50 52
					51 53
					52 54
					53 55
					54 56
					55 57
						curSource = 55
						d	s	r
						52, 50 ,48

						dEnd = 52 48 = 100
						sEnd = 98

							50		55			98
						jos  s <= curSource < sEnd
							// asetaan curSource dest arvo joka saadaan
							curSource = 55 - 50 + 52

				*/

				if source >= s && source < sEnd {
					source = source - s + d
					fmt.Println("new source", source)
					break
				} else {
					fmt.Println("source", source)
				}

			}

		}
		if source < lowestLocation {
			lowestLocation = source
		}
	}
	fmt.Println(lowestLocation, "location")
}

// [10 15 2] -> [[] , []]
func collectRanges(a []int64) []int64 {
	fmt.Println(a, "miisu")
	return a
}

func parseSeeds(s []int64) [][]int64 {
	c := make([][]int64, 0)
	for i := 0; i < len(s); i += 2 {
		end := s[i+1] + s[i]
		start := s[i]
		c = append(c, []int64{start, end})
	}
	return c
}

// add all k-v pairs from m2 to m1
func addMap(m1, m2 map[int64]int64) map[int64]int64 {
	for k, v := range m2 {
		m1[k] = v
	}
	return m1
}
func mapValues(a []int64) map[int64]int64 {
	fmt.Println("in mapvalues")
	var m map[int64]int64 = make(map[int64]int64, a[2])
	destStart := a[0]
	sourceStart := a[1]
	rl := a[2]

	var d []int64
	var s []int64
	end := destStart + rl
	for destStart < end {
		d = append(d, destStart)
		destStart++
	}
	end = sourceStart + rl
	for sourceStart < end {
		s = append(s, sourceStart)
		sourceStart++
	}
	for i, el := range s {
		if i > len(d)-1 {

			m[el] = el
		} else {
			m[el] = d[i]
		}
	}
	return m
}

func convToInts(s []string) []int64 {
	var conv []int64
	for _, e := range s {
		e = strings.TrimSpace(e)
		if i, err := strconv.ParseInt(e, 10, 64); err == nil {
			conv = append(conv, i)
		}
	}
	return conv
}
