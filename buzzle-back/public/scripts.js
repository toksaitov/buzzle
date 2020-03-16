$(function() {
    const animationSpeed = 'fast';

    $(".delete-button").click(function(event) {
        event.preventDefault();

        const deleteButton = $(this);
        if (deleteButton.val() === 'Delete') {
            $.post(`/message/${deleteButton.data('id')}/delete`, function() {
                const cardColumn = deleteButton.parents('.message').parent();
                cardColumn.hide(animationSpeed, function() {
                    $(this).remove();
                });
            });
        } else {
            const editButton = deleteButton.parents('.message').find(".edit-button");
            editButton.attr('disabled', true);
            deleteButton.attr('disabled', true);

            const content = deleteButton.parents('.message').find('.message-content');
            const input = content.next();
            input.hide(animationSpeed, function() {
                content.show(animationSpeed, function() {
                    input.remove();

                    editButton.val('Edit');
                    deleteButton.val('Delete');

                    editButton.attr('disabled', false);
                    deleteButton.attr('disabled', false);
                });
            });
        }
    });

    $(".edit-button").click(function(event) {
        event.preventDefault();

        const editButton = $(this);
        if (editButton.val() === 'Edit') {
            const deleteButton = editButton.parents('.message').find(".delete-button");
            editButton.attr('disabled', true);
            deleteButton.attr('disabled', true);

            const content = editButton.parents('.message').find('.message-content');
            content.hide(animationSpeed, function() {
                const input = $(`<textarea>${content.text()}</textarea>`);
                input.hide().insertAfter(content).show(animationSpeed, function() {
                    editButton.attr('disabled', false);
                    deleteButton.attr('disabled', false);

                    editButton.val('Done');
                    deleteButton.val('Cancel');
                });
            });
        } else {
            const deleteButton = editButton.parents('.message').find(".delete-button");
            editButton.attr('disabled', true);
            deleteButton.attr('disabled', true);

            const content = deleteButton.parents('.message').find('.message-content');
            const input = content.next();

            const data = { 'content': input.val() }
            $.post(`/message/${editButton.data('id')}/edit`, data, function() {
                input.hide(animationSpeed, function() {
                    content.text(input.val());
                    content.show(animationSpeed, function() {
                        input.remove();

                        editButton.val('Edit');
                        deleteButton.val('Delete');

                        editButton.attr('disabled', false);
                        deleteButton.attr('disabled', false);
                    });
                });
            });
        }
    });
});
