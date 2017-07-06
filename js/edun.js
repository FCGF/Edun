(function ($) {
    "use strict";

    var options = {
        'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
        'btn-success': '<i class="fa fa-check"></i>',
        'btn-error': '<i class="fa fa-remove"></i>',
        'msg-success': 'Redirecionando...',
        'msg-error': 'Credenciais errados!',
        'useAJAX': true,
    };

    $("#login-form").validate({
        rules: {
            lg_username: "required",
            lg_password: "required",
        },
        errorClass: "form-invalid"
    });

    $("#login-form").submit(function () {
        remove_loading($(this));

        window.location.replace("./../html/main.html");
    });

    $("#register-form").validate({
        rules: {
            reg_username: "required",
            reg_password: {
                required: true,
                minlength: 5
            },
            reg_password_confirm: {
                required: true,
                minlength: 5,
                equalTo: "#register-form [name=reg_password]"
            },
            reg_email: {
                required: true,
                email: true
            },
            reg_agree: "required",
        },
        errorClass: "form-invalid",
        errorPlacement: function (label, element) {
            if (element.attr("type") === "checkbox" || element.attr("type") === "radio") {
                element.parent().append(label);
            } else {
                label.insertAfter(element);
            }
        }
    });

    $("#register-form").submit(function () {
        remove_loading($(this));

        if (options['useAJAX'] == true) {
            dummy_submit_form($(this));
            return false;
        }
    });

    $("#consumable-form").validate({
        rules: {
            reg_description: "required",
            reg_price: {
                required: true,
                minlength: 1
            },
            reg_rules: "required"
        },
        errorClass: "form-invalid",
        errorPlacement: function (label, element) {
            if (element.attr("type") === "checkbox" || element.attr("type") === "radio") {
                element.parent().append(label);
            } else {
                label.insertAfter(element);
            }
        }
    });

    $("#consumable-form").submit(function () {
        remove_loading($(this));

        window.location.replace("./../html/atividade.html");
    });

    $("#activity-form").validate({
        rules: {
            reg_title: "required",
            reg_description: "required",
            reg_date: "required",
            reg_weight: {
                required: true,
                minlength: 1
            },
            reg_experience: {
                required: true,
                minlength: 1
            }
        },
        errorClass: "form-invalid",
        errorPlacement: function (label, element) {
            if (element.attr("type") === "checkbox" || element.attr("type") === "radio") {
                element.parent().append(label);
            } else {
                label.insertAfter(element);
            }
        }
    });

    $("#activity-form").submit(function () {
        remove_loading($(this));

        window.location.replace("./../html/atividade.html");
    });

    $("#forgot-password-form").validate({
        rules: {
            fp_email: "required",
        },
        errorClass: "form-invalid"
    });

    $("#forgot-password-form").submit(function () {
        remove_loading($(this));

        if (options['useAJAX'] == true) {
            dummy_submit_form($(this));
            return false;
        }
    });

    $('.btn-number').click(function (e) {
        e.preventDefault();

        var fieldName = $(this).attr('data-field');
        var type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {
                input.val(currentVal + 1).change();
            }
        } else {
            input.val(0);
        }
    });

    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });

    $('.input-number').change(function () {
        var minValue = parseInt($(this).attr('min'));
        var valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    });

    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".progress").click(function () {
        window.location.replace("./../html/leaderboard.html");
    })

    function remove_loading($form) {
        $form.find('[type=submit]').removeClass('error success');
        $form.find('.login-form-main-message').removeClass('show error success').html('');
    }

    function form_loading($form) {
        $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
    }

    function form_success($form) {
        $form.find('[type=submit]').addClass('success').html(options['btn-success']);
        $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
    }

    function form_failed($form) {
        $form.find('[type=submit]').addClass('error').html(options['btn-error']);
        $form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
    }

    function dummy_submit_form($form) {
        if ($form.valid()) {
            form_loading($form);

            setTimeout(function () {
                form_success($form);
            }, 1000);
        }
    }

})(jQuery);