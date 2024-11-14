import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './KanbanPage.css';




<body>
    <nav class="nav-bar">
        <a href="#" class="nav-item">User Profile</a>
        <a href="#" class="nav-item">The Task Burrow</a>
        <div class="logo"></div>
        <a href="#" class="nav-item">About Our Team</a>
        <a href="#" class="nav-item">Logout</a>
    </nav>

    <main class="main-content">
        <div class="column todo">
            <div class="column-header">To-Do</div>
            <div class="task-card"></div>
            <div class="task-card"></div>
        </div>

        <div class="column in-progress">
            <div class="column-header">In-Progress</div>
            <div class="task-card"></div>
            <div class="task-card"></div>
        </div>

        <div class="column done">
            <div class="column-header">Done</div>
            <div class="task-card"></div>
            <div class="task-card"></div>
        </div>
    </main>

    <div class="fox-tip">
        Focus Fox Tip: Take a 'Fox Pause' every hour—close your eyes, take three deep breaths, and sharpen your focus. Quick resets like this keep distractions at bay!
    </div>
</body>