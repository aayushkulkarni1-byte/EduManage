import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import java.net.InetSocketAddress

fun sendResponse(
    exchange: HttpExchange,
    statusCode: Int,
    response: String
) {
    exchange.responseHeaders.set(
        "Content-Type",
        "application/json"
    )

    exchange.responseHeaders.set(
        "Access-Control-Allow-Origin",
        "*"
    )

    exchange.responseHeaders.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    )

    exchange.responseHeaders.set(
        "Access-Control-Allow-Headers",
        "Content-Type"
    )

    val bytes = response.toByteArray()

    exchange.sendResponseHeaders(
        statusCode,
        bytes.size.toLong()
    )

    exchange.responseBody.use { output ->
        output.write(bytes)
    }
}

fun main() {

    val server = HttpServer.create(
        InetSocketAddress(8080),
        0
    )

    // Home
    server.createContext("/") { exchange ->

        sendResponse(
            exchange,
            200,
            """
            {
              "status": "success",
              "message": "EduManage Kotlin Backend is running"
            }
            """.trimIndent()
        )
    }


    // Health API
    server.createContext("/api/health") { exchange ->

        sendResponse(
            exchange,
            200,
            """
            {
              "status": "success",
              "message": "EduManage backend is running",
              "technology": "Kotlin"
            }
            """.trimIndent()
        )
    }


    // Students API
    server.createContext("/api/students") { exchange ->

        sendResponse(
            exchange,
            200,
            """
            {
              "status": "success",
              "message": "Students API is working"
            }
            """.trimIndent()
        )
    }


    // Teachers API
    server.createContext("/api/teachers") { exchange ->

        sendResponse(
            exchange,
            200,
            """
            {
              "status": "success",
              "message": "Teachers API is working"
            }
            """.trimIndent()
        )
    }


    // Notices API
    server.createContext("/api/notices") { exchange ->

        sendResponse(
            exchange,
            200,
            """
            {
              "status": "success",
              "message": "Notices API is working"
            }
            """.trimIndent()
        )
    }


    server.start()

    println("====================================")
    println("      EduManage Kotlin Backend")
    println("====================================")
    println("Server running at:")
    println("http://localhost:8080")
    println("")
    println("Health API:")
    println("http://localhost:8080/api/health")
    println("====================================")
}