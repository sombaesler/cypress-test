

 function selectDayFromCurrent(day) {
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDate = date.getDate()
    let futureMonth = date.toLocaleString('default', { month: 'short' })
    let dateAssert = futureMonth + ' ' + futureDate + ', ' + date.getFullYear()

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        } else {
            cy.get('.day-cell').not('bounding-month').contains(futureDate).click()
        }
    })
    return dateAssert
}

export class DatepickerPage {

    selectCommonDatepickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input[placeholder="Form Picker"]').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    selectDatepickerWithRangeFromToday(firstDate, secondDate){
        cy.contains('nb-card', 'Datepicker With Range').find('input[placeholder="Range Picker"]').then(input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDate)
            let dateAssertSecond = selectDayFromCurrent(secondDate)
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const onDatepickerPage = new DatepickerPage()