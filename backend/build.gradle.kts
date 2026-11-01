plugins {
    kotlin("jvm") version "2.4.20"
    application
    kotlin("plugin.serialization") version "2.4.20"
}

group = "com.edumanage"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {

    implementation("io.ktor:ktor-server-core-jvm:3.3.0")
    implementation("io.ktor:ktor-server-netty-jvm:3.3.0")

    implementation("io.ktor:ktor-server-content-negotiation-jvm:3.3.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:3.3.0")

    implementation("io.ktor:ktor-server-cors-jvm:3.3.0")

    implementation("ch.qos.logback:logback-classic:1.5.18")

    testImplementation(kotlin("test"))
    testImplementation("io.ktor:ktor-server-test-host-jvm:3.3.0")
}

application {
    mainClass.set("com.edumanage.ApplicationKt")
}

kotlin {
    jvmToolchain(17)
}