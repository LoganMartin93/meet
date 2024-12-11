Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user has not specified the number of events to display
    When the event list is displayed
    Then the event list should show a default of 32 events

  Scenario: User can change the number of events displayed
    Given the user wants to change the number of events displayed
    When the user enters a specific number of events to display
    Then the event list should update to show the specified number of events
