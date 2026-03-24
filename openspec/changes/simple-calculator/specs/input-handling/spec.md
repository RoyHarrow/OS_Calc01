## ADDED Requirements

### Requirement: Numeric input
The system SHALL accept numeric input from the user.

#### Scenario: Enter single digit
- **WHEN** user clicks or presses digit button (0-9)
- **THEN** system SHALL append that digit to the current number and display it

#### Scenario: Enter multi-digit number
- **WHEN** user clicks multiple digit buttons sequentially
- **THEN** system SHALL combine them into a multi-digit number

### Requirement: Operation selection
The system SHALL accept operation selection from the user.

#### Scenario: Select arithmetic operation
- **WHEN** user clicks an operation button (+, -, *, /)
- **THEN** system SHALL register the operation and prepare for the second operand

### Requirement: Calculation execution
The system SHALL execute the calculation when requested.

#### Scenario: Execute by equals button
- **WHEN** user has entered two operands and an operation, then presses =
- **THEN** system SHALL perform the calculation and display the result

### Requirement: Decimal input
The system SHALL support decimal numbers.

#### Scenario: Enter decimal number
- **WHEN** user clicks a decimal point button
- **THEN** system SHALL append a decimal point to the current number (only one decimal point allowed per number)
