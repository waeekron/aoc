import kotlin.io.path.Path
import kotlin.io.path.readText

fun readInput(day: String) = Path("app/src/main/resources/$day").readText().trim().lines()