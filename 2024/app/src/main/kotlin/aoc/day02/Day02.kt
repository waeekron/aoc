package aoc.day02

import readInput
import kotlin.math.abs


fun main() {
//    part1()
    part2()
}

fun parse(): List<List<Int>> =
    readInput("input02.txt").map {
        it.split(" ").map { it.toInt() }
    }

fun part1() {
    var safeCount = 0
    val raports = parse()
    for (raport in raports) {
        var safe = true
        val increasing = raport[0] < raport[1]
        for (i in 0..<raport.size - 1) {
            val difference = abs(raport[i] - raport[i + 1])
            if (difference == 0 || difference < 1 || difference > 3) {
                safe = false
                break
            }
            if (i > 1 && i < raport.size - 1) {
                if (increasing) {
                    if (!(raport[i - 1] < raport[i] && raport[i] < raport[i + 1])) {
                        safe = false
                        break
                    }
                } else {
                    if (!(raport[i - 1] > raport[i] && raport[i] > raport[i + 1])) {
                        safe = false
                        break
                    }
                }

            }

        }
        if (safe) {
            safeCount++
        }
    }
    println(safeCount)
}

fun part2() {
    var safeCount = 0
    val raports = parse()
    val checkAgain = emptyList<List<Int>>().toMutableList()
    val safeRaports = emptyList<List<Int>>().toMutableList()
    for (raport in raports) {

        var safe = true
        if (checkRaport(raport)) {
            safeCount++
            safeRaports.add(raport)
        } else {
            checkAgain.add(raport)
        }

    }
    for (raport in checkAgain) {
        for (i in 0..<raport.size) {
            val candidate = raport.toMutableList().filterIndexed { idx, _ -> idx != i }
            if (checkRaport(candidate)) {

                safeCount++

                print("candidate ")
                println(candidate.toString())

                break
            }
        }
    }
    println(safeCount)
}

fun checkRaport(raport: List<Int>): Boolean {
    var safe = true
    val increasing = raport[0] < raport[1]
    for (i in 0..<raport.size - 1) {
        val difference = abs(raport[i] - raport[i + 1])
        if (difference == 0 || difference < 1 || difference > 3) {
            safe = false
            break
        }
        if (i > 1 && i < raport.size - 1) {
            if (increasing) {
                if (!(raport[i - 1] < raport[i] && raport[i] < raport[i + 1])) {
                    safe = false
                    break
                }
            } else {
                if (!(raport[i - 1] > raport[i] && raport[i] > raport[i + 1])) {
                    safe = false
                    break
                }
            }

        }

    }
    return safe
}
