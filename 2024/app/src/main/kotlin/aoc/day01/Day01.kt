package aoc.day01

import readInput
import kotlin.math.abs

fun part1(input: List<String>) {
    val pairs = input.map {
         it.split("   ").map { s -> s.toInt() }
    }
    var left = pairs.map {
        it[0]
    }
    var right = pairs.map {
        it[1]
    }

    left = left.sorted()
    right = right.sorted()

    var sumOfDistances = 0

    for (i in 0..pairs.lastIndex ) {
        sumOfDistances += abs(left[i]- right[i])
    }
    println(sumOfDistances)
}

fun part2(input: List<String>) {
    val pairs = input.map { it.split("   ").map { s -> s.toInt() } }
    val left = pairs.map { it[0] }
    val right = pairs.map { it[1] }
    var similarityScore = 0
    for((idx, value) in left.withIndex()) {

       val count=    right.count{ it == value}

        similarityScore += value*count



    }

    println(similarityScore)

}
fun main() {
    part1(readInput("input01.txt"))
    part2(readInput("input01.txt"))
}