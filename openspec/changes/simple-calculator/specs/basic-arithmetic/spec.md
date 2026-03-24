## ADDED Requirements

### Requirement: Addition operation
The system SHALL perform addition of two numbers and display the result.

#### Scenario: Add two positive numbers
- **WHEN** user enters 5, presses +, enters 3, and presses =
- **THEN** system SHALL display 8

#### Scenario: Add negative numbers
- **WHEN** user enters -5, presses +, enters -3, and presses =
- **THEN** system SHALL display -8

### Requirement: Subtraction operation
The system SHALL perform subtraction of two numbers and display the result.

#### Scenario: Subtract positive numbers
- **WHEN** user enters 10, presses -, enters 3, and presses =
- **THEN** system SHALL display 7

#### Scenario: Subtract resulting in negative
- **WHEN** user enters 5, presses -, enters 10, and presses =
- **THEN** system SHALL display -5

### Requirement: Multiplication operation
The system SHALL perform multiplication of two numbers and display the result.

#### Scenario: Multiply positive numbers
- **WHEN** user enters 6, presses *, enters 4, and presses =
- **THEN** system SHALL display 24

### Requirement: Division operation
The system SHALL perform division of two numbers and display the result.

#### Scenario: Divide positive numbers
- **WHEN** user enters 20, presses /, enters 4, and presses =
- **THEN** system SHALL display 5

#### Scenario: Division by zero
- **WHEN** user enters 10, presses /, enters 0, and presses =
- **THEN** system SHALL display an error message "Cannot divide by zero"
