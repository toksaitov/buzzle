$(function() {
    $('input[value=Edit]').click(function(event) {
        event.preventDefault();

        const button = $(this);
        button.prop('disabled', true);

        if (button.val() === 'Edit') {
            const form = button.parent();
            const content = form.parent().parent().prevAll('.card-text');
            content.hide('fast');

            const textArea = $(`<textarea class="d-block">${content.text()}</textarea>`);
            textArea.hide().insertAfter(content).show('slow').queue(function() {
                button.val('Done');
                button.prop('disabled', false);
            });
        } else {
            const form = button.parent();
            const textArea = form.parent().parent().prevAll('textarea');
            const content = textArea.prevAll('.card-text');
            $.post(`/message/${button.data('id')}/edit`, { 'content': textArea.val() }, function() {
                content.text(textArea.val());
                textArea.remove();
                content.show('slow');
                button.val('Edit');
                button.prop('disabled', false);
            });
        }
    });

    $('input[value=Delete]').click(function(event) {
        event.preventDefault();

        const element = $(this);
        $.post(`/message/${element.data('id')}/delete`, function() {
            element.parents('.col-md-4')
                   .fadeOut('fast')
                   .queue(function() {
                       $(this).remove();
                   });
        });
    });
});
