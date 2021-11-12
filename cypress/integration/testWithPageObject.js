import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutPage"
import { navigationTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"


describe('Test with Page Objects', () => {

    beforeEach('Open application', () => {
        cy.openHomePage()
    })

    it('verify navigations actions the pages', () => {
        navigationTo.formLayoutsPage()
        navigationTo.datePickerPage()
        navigationTo.toastrPage()
        navigationTo.tooltipPage()
        navigationTo.smartTablePage()
    })

    it(' should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigationTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('som', 'som@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigationTo.datePickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigationTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Som', 'Baes')
        onSmartTablePage.updateAgeByFirstName('Som', '28')
        onSmartTablePage.delectRowByIndex('1')
    })


})