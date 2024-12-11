Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user has not searched for a city
    When the user views the event list
    Then the user should see upcoming events from all cities
    And the event details should be collapsed by default

  Scenario: User can expand an event to see details
    Given the user is viewing the event list
    When the user clicks the "Show Details" button for an event
    Then the event details should be displayed
    And the "Show Details" button should change to "Hide Details"

  Scenario: User can collapse an event to hide details
    Given the user has expanded an event to see details
    When the user clicks the "Hide Details" button for the event
    Then the event details should be hidden
    And the "Hide Details" button should change to "Show Details"
    

