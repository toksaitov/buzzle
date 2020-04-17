import { connect } from 'react-redux';

import { clearError } from '../actions/error.js';
import { createUser } from '../actions/user.js';
import { updateRegisterForm, unloadRegisterForm } from '../actions/forms.js';
import RegisterForm from '../components/RegisterForm.js';

const mapStateToProps = state => ({
    'user': state.user,
    'login': state.registerForm.login,
    'password': state.registerForm.password,
    'password-repeat': state.registerForm['password-repeat']
});

const mapDispatchToProps = dispatch => ({
    'clearError': () => dispatch(clearError()),
    'createUser': credentials => dispatch(createUser(credentials)),
    'updateRegisterForm': (name, value) => dispatch(updateRegisterForm(name, value)),
    'unloadRegisterForm': () => dispatch(unloadRegisterForm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);
