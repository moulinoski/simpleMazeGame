# Simple Maze Game - Project Context

## Purpose
The **Simple Maze Game** is a programming exercise designed to explore and practice basic Object-Oriented Programming (OOP) principles in JavaScript with a strong emphasis on modularity, clean separation of concerns, and maintainable software architecture.

## Architecture & Design Patterns
- **Object-Oriented Programming (OOP)**: Core game logic, maze structures, and grid elements are encapsulated into clean class hierarchies.
- **Modularity**: The codebase is organized into dedicated, single-responsibility modules:
  - `mazes/`: Contains base abstract structures (`Maze`) and concrete configurations of varying dimensions (`TinyMaze`, `SmallMaze`, `LargeMaze`).
  - `cells/`: Defines abstract cell behaviors (`Passable`, `Impassable`) and concrete implementations (`BasicPassable`, `BasicImpassable`).
  - `algorithms/`: Contains specialized algorithmic logic for maze creation (`MazeGenerator`) and pathfinding (`MazeSolver`).
  - `displays/`: Contains modular stylesheets corresponding to the visual sections of the interface (`base.css`, `title.css`, `loading-screen.css`, `canvas.css`, `win-overlay.css`).
- **Abstract Factory Pattern (Attempted)**: The project attempts an Abstract Factory design pattern to compose families of related objects (such as matching sets of passable floors and impassable walls) tailored to specific maze configurations without tightly coupling them to client code.

## Development & Asset Guidelines
- **Programming Exercise**: Built as an iterative learning and implementation exercise.
- **AI-Generation Scope**: Only the **code** can be AI-generated.
- **Asset Restrictions**: **No other assets** (such as images, textures, audio, or external multimedia) can be AI-generated.

## Player Character States
- **Directional & Inactivity Avatars**: The player character dynamically changes emojis based on user input and timing cycles:
  - **Right or Down movement**: changes to `🚶‍➡️` (Unicode No. 418: `[U+1F6B6 U+200D U+27A1 U+FE0F]`, "person walking: facing right") before moving.
  - **Left or Up movement**: changes to `🚶` (person walking: facing left) before moving.
  - **Idle (next cycle with no input)**: transitions to standing `🧍`.
  - **Inactive (2+ seconds without input)**: transitions to sleeping `🛌` until the user makes a move.
