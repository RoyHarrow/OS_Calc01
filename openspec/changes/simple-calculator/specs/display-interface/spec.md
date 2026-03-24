## ADDED Requirements

### Requirement: Numeric display
The system SHALL display the current input and/or calculation result on screen.

#### Scenario: Display user input
- **WHEN** user enters digits
- **THEN** system SHALL display those digits in the calculator display area

#### Scenario: Display calculation result
- **WHEN** user completes a calculation by pressing =
- **THEN** system SHALL display the result in the calculator display area

### Requirement: Clear display
The system SHALL provide a way to clear the display and reset the calculator.

#### Scenario: Clear current input
- **WHEN** user presses C (Clear) button
- **THEN** system SHALL clear the display and reset all operation state

### Requirement: Visual feedback for operations
The system SHALL show which operation is currently selected or pending.

#### Scenario: Show pending operation
- **WHEN** user enters a number, then presses an operation button
- **THEN** system SHALL display or indicate which operation is pending
