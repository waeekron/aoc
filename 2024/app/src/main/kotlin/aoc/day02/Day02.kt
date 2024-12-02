package aoc.day02

import readInput
import kotlin.math.abs


fun main() {
    part1()
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
