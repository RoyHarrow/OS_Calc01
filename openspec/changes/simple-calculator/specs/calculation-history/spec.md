## ADDED Requirements

### Requirement: Session calculation history
The system SHALL maintain a history of calculations during the user session.

#### Scenario: Store completed calculation
- **WHEN** user completes a calculation by pressing =
- **THEN** system SHALL store the calculation (operand1, operation, operand2, result) in the history

#### Scenario: Display recent calculation
- **WHEN** user presses = to complete a calculation
- **THEN** system SHALL display the recent calculation details

### Requirement: Clear history
The system SHALL allow users to clear the calculation history.

#### Scenario: Clear all history
- **WHEN** user presses the Clear button
- **THEN** system SHALL clear the calculation history along with resetting the display

### Requirement: History persistence during session
The system SHALL keep history available as long as the calculator session is active.

#### Scenario: Calculation remains after new input
- **WHEN** user completes a calculation, then starts a new one
- **THEN** the previous calculation SHALL remain in the history
