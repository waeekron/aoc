package aoc.day01

import readInput
import kotlin.math.abs

fun part1(){
    val pairs = parse()
    var left = pairs.first
    var right = pairs.second
    left = left.sorted()
    right = right.sorted()
    var sumOfDistances = 0

    for (i in left.indices) {
        sumOfDistances += abs(left[i]- right[i])
    }

    println(sumOfDistances)
}

fun part2() {
    val pairs = parse()
    val left = pairs.first
    val right = pairs.second
    var similarityScore = 0

    left.forEach {
        similarityScore += it + right.count {value -> value == it}
    }

    println(similarityScore)

}

fun parse(): Pair<List<Int>, List<Int>> {
  val pairs = readInput("input01.txt").map {
      it.split("   ").map { s -> s.toInt() }
  }
    val left = pairs.map { it[0]}
    val right= pairs.map { it[1]}
    return Pair(left, right)
}

fun main() {
    part1()
    part2()
}