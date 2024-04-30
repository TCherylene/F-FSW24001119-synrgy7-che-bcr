$('#filter__button').on('click', function () {
    const form = $('#filter__form-container');
    const time = $(form).find('input[name="time"]').attr('data-value');
    const passenger = $(form).find('input[name="passenger"]').attr('data-value');
    const driver = $(form).find('input[name="driver"]').attr('data-value')

    const params = { date: dateData, time, passenger, driver };

    if (time, driver, dateData) {
        const app = new App();
        app.clear();
        app.init(params).then(app.run);
    }
})