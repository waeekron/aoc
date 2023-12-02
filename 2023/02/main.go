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

	// how to read files with go?
	// you can read files with os package
	gameIDs := make([]int, 0)
	cubeSets := make([]Draw, 0)
	sets := make([]Set, 0)
	games := make([][]Set, 0)
	data, err := os.ReadFile("02/input.txt")
	if err != nil {
		log.Fatal(err)
	}
	lines := strings.Split(string(data), "\n")

	for _, line := range lines {
		// game 1 : sets
		parts := strings.Split(line, ":")
		fmt.Println(len(parts))

		id, err := strconv.Atoi(strings.Split(parts[0], " ")[1])
		if err != nil {
			log.Fatal(err)
		}
		gameIDs = append(gameIDs, id)

		s := strings.Split(parts[1], ";")
		// [1 blue 2 red, 3 green] game and its draws
		for _, set := range s {
			fmt.Println("SET", s)
			// amountsAndColors each element is a draw of a set
			amountAndColors := strings.Split(set, ",")
			fmt.Println(amountAndColors, len(amountAndColors))
			var d Draw
			for _, v := range amountAndColors {
				parts := strings.Split(v, " ")
				//fmt.Println("THIS IS THE LENGTH OF PARTS", len(parts), parts)

				color := parts[2]
				a := parts[1]
				fmt.Println(a, string(color), len(parts), parts, "sanikoira")
				if amount, err := strconv.Atoi(string(a)); err == nil {
					fmt.Println("in if statement")
					d.color = string(color)
					d.amount = amount

					fmt.Println(color, amount, "kissa", d)
					cubeSets = append(cubeSets, d)
				}

				fmt.Println("cubeSets", cubeSets)

			}

			sets = append(sets, Set{draws: cubeSets})
			cubeSets = make([]Draw, 0)
		}
		games = append(games, sets)

		sets = make([]Set, 0)
	}
	fmt.Println(len(gameIDs))
	fmt.Println(len(sets))
	fmt.Println("\n")
	fmt.Println(len(games), games[0][0], "kakka")

	/*
		only 12 red cubes, 13 green cubes, and 14 blue cubes
		game is not possible if one draw has more than above amount of certain color cube
	*/
	sum := 0
	for i, sets := range games {
		possible := false
		fmt.Println("Peli", i, "arvoilla", sets)
		for _, set := range sets {
			handIsPossible := true
			for _, draw := range set.draws {
				a := draw.amount
				fmt.Println()
				switch color := draw.color; color {
				case "red":
					fmt.Println("red", draw)
					if a > 12 {
						fmt.Println("red", draw, "PASKAAAAAAA", i)
						handIsPossible = false
						break
					}
				case "blue":
					if a > 14 {
						if a == 15 {
							println("VITTU JEE")
						}
						fmt.Println(a, "blue", draw, "PASKAAAAAAA", i)
						fmt.Println("ASETETAAN handIsPossible=false vittu")
						handIsPossible = false
						fmt.Println("ASETETAAN handIsPossible=false vittu ja break", handIsPossible, possible)
						break
					}
				case "green":

					if a > 13 {
						fmt.Println(a, "green", draw, "PASKAAA", i)
						handIsPossible = false
						break
					}
				default:

				}
				//fmt.Printf("%v | ", draw)
			}
			fmt.Println("AFTER VITUN SAATANA BREAK", handIsPossible)
			fmt.Println("BEFORE HANDISPOSSIBLE IF CHECK", handIsPossible, possible)
			if handIsPossible {
				possible = true
			} else {
				fmt.Println("In not possible", handIsPossible, possible)
				possible = false
				break
			}

			fmt.Println("\n\n")
		}
		if possible {
			fmt.Println("adding", i+1)
			sum += i + 1
			possible = false
		}
		fmt.Println("------------------------")
	}
	fmt.Println(sum)
	//for i, game := range sets {
	//	fmt.Println(i)

	//	for _, g := range game.draws {
	//		g = g
	//	}
	//	fmt.Println(len(game.draws))
	//	fmt.Println()
	//}
}
