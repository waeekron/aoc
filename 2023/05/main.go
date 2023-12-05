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
	for _, seed := range s {
		fmt.Println("Seed", seed)
		source := seed
		for _, l := range lines[1:] {

			combinedMap := make(map[int64]int64)
			parts := strings.Split(l, "\n")[1:]
			for _, p := range parts {
				m := convToInts(strings.Split(p, " "))

				// form a map from the array
				sourceToDest := mapValues(m)
				//fmt.Println("\n", i, sourceToDest)
				addMap(combinedMap, sourceToDest)
				// get next value fo
			}
			// now we have

			// check if map has source
			if combinedMap[source] != 0 {
				source = combinedMap[source]
			}

		}
		if source < lowestLocation {
			lowestLocation = source
		}
	}
	fmt.Println(lowestLocation)
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
	fmt.Println("before crash")
	var conv []int64
	for _, e := range s {
		fmt.Println("Testi", s)
		e = strings.TrimSpace(e)
		if i, err := strconv.ParseInt(e, 10, 64); err == nil {
			fmt.Println("conv", i)
			conv = append(conv, i)
		}
	}
	return conv
}
