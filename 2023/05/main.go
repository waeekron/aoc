package main

import (
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
	"time"
)

type Range struct {
	start, end int
}

type Mapping struct {
	source, destination Range
	rangeLength         int
}

func main() {
	t := time.Now()
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatal("Something went wrong")
	}
	parts := strings.Split(string(dat), "\r\n\r\n")

	maps := collectMaps(parts[1:])
	fmt.Println(maps[0][0].rangeLength)
	seeds := strings.Split(strings.TrimSpace(strings.Split(parts[0], ":")[1]), " ")

	length := getLength(seeds)
	allSeeds := collectSeeds(seeds, length)
	_ = allSeeds
	fmt.Println("Starting to look for smallest location")
	smallesLocation := math.MaxInt64
	for i := range allSeeds {
		cur := allSeeds[i]
		// iterate through maps
		for _, m := range maps {
			b := false
			for _, r := range m {
				if r.source.start <= cur && cur <= r.source.end {
					cur = cur - r.source.start + r.destination.start
					b = true
					break
				}
			}
			if b {
				continue
			}
		}

		if smallesLocation == math.MaxInt64 || smallesLocation > cur {
			smallesLocation = cur
		}
	}

	//for _, sr := range seedRanges {
	//	// iterate over all the seeds in seedRange

	//	for sr.start < sr.end {

	//		seed := sr.start
	//		fmt.Println("seed-end", seed, sr.end)
	//		// iterate over all the maps for a seed
	//		for range maps {
	//			//fmt.Println("fromTo", fromTo)
	//		}
	//		sr.start++
	//	}
	//}

	fmt.Println("Code took", time.Since(t), "to run")
	fmt.Println(smallesLocation)
}

func collectMaps(m []string) [][]Mapping {

	var maps [][]Mapping
	for _, mapping := range m {

		mapping := strings.Split(mapping, ":")
		mapping = strings.Split(mapping[1], "\n")

		var tmp []Mapping
		for _, v := range mapping[1:] {
			p := strings.Split(v, " ")
			destinationStart, sourceStart, rangeLen := p[0], p[1], p[2]
			destStart, _ := strconv.Atoi(strings.TrimSpace(destinationStart))
			sourStart, _ := strconv.Atoi(strings.TrimSpace(sourceStart))
			rlen, _ := strconv.Atoi(strings.TrimSpace(rangeLen))
			sourceRange := Range{start: sourStart, end: sourStart + rlen}
			destRange := Range{start: destStart, end: destStart + rlen}

			mappingFromTo := Mapping{source: sourceRange, destination: destRange, rangeLength: rlen}
			tmp = append(tmp, mappingFromTo)
		}
		maps = append(maps, tmp)
	}
	return maps
}
func collectSeeds(seeds []string, l int) []int {
	fmt.Println("Generate all the seeds")
	var allSeeds = make([]int, l)
	var j int
	for i := 0; i < len(seeds); i += 2 {
		s, e := seeds[i], seeds[i+1]
		start, _ := strconv.Atoi(s)
		end, _ := strconv.Atoi(e)
		end += start
		for start < end {
			allSeeds[j] = start
			start++
			j++
		}
	}

	return allSeeds
}
func getLength(seeds []string) int {
	var l int
	for i := 0; i < len(seeds); i += 2 {
		rl, _ := strconv.Atoi(seeds[i+1])
		l += rl
	}
	return l
}

//func collectSeedRanges(seeds []string) []Range {
//
//	var ranges []Range
//	for i := 0; i < len(seeds); i += 2 {
//		s, e := seeds[i], seeds[i+1]
//		start, _ := strconv.Atoi(s)
//		end, _ := strconv.Atoi(e)
//		end += start
//		r := Range{start: start, end: end}
//		ranges = append(ranges, r)
//	}
//
//	return ranges
//}
