package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Draw struct {
	amount int
	color  string
}

func (d Draw) String() string {
	return fmt.Sprintf("%d - %s", d.amount, d.color)
}

type Set struct {
	draws []Draw
}

func main() {

	gameIDs := make([]int, 0)
	cubeSets := make([]Draw, 0)
	sets := make([]Set, 0)
	games := make([][]Set, 0)
	data, err := os.ReadFile("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	lines := strings.Split(string(data), "\n")

	for _, line := range lines {
		parts := strings.Split(line, ":")
		id, err := strconv.Atoi(strings.Split(parts[0], " ")[1])
		if err != nil {
			log.Fatal(err)
		}
		gameIDs = append(gameIDs, id)
		s := strings.Split(parts[1], ";")
		for _, set := range s {
			amountAndColors := strings.Split(set, ",")
			var d Draw
			for _, v := range amountAndColors {
				parts := strings.Split(v, " ")
				color := parts[2]
				a := parts[1]
				if amount, err := strconv.Atoi(string(a)); err == nil {
					d.color = strings.TrimSuffix(string(color), "\r")
					d.amount = amount
					cubeSets = append(cubeSets, d)
				}
			}
			sets = append(sets, Set{draws: cubeSets})
			cubeSets = make([]Draw, 0)
		}
		games = append(games, sets)
		sets = make([]Set, 0)
	}
	/*
		part 1
			only 12 red cubes, 13 green cubes, and 14 blue cubes
			game is not possible if one draw has more than above amount of certain color cube
		part 2
			figure out the fewest number of cubes of each color for a game
	*/

	sum := 0
	sum2 := 0
	count := 0

	for i, sets := range games {
		var largestBlue, largestRed, largestGreen int
		possible := false
		for _, set := range sets {
			handIsPossible := true
			for _, draw := range set.draws {
				a := draw.amount
				switch color := draw.color; color {
				case "red":
					if a > 12 {
						handIsPossible = false
						break
					}
				case "blue":
					if a > 14 {
						handIsPossible = false
						break
					}
				case "green":

					if a > 13 {
						handIsPossible = false
						break
					}
				default:
					// do nothing
				}
			}
			for _, draw := range set.draws {
				a := draw.amount
				count++

				switch color := draw.color; color {
				case "red":

					if a > largestRed {
						largestRed = a
					}

				case "blue":
					if a > largestBlue {
						largestBlue = a
					}

				case "green":
					if a > largestGreen {
						largestGreen = a
					}

				default:
					// do nothing
					println("IN DEFAULT")
				}
			}
			if handIsPossible {
				possible = true
			} else {
				possible = false
			}
		}
		product := largestRed * largestBlue * largestGreen

		largestGreen, largestRed, largestBlue = 0, 0, 0
		sum2 += product
		if possible {
			sum += i + 1
			possible = false
		}
	}
	fmt.Printf("part 1: %v\n", sum)
	fmt.Printf("part 2: %v\n", sum2)

	fmt.Println("count", count)
}
