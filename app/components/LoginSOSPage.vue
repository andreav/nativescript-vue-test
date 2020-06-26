<template>
  <Page :actionBarHidden="actionBarHidden">
    <ActionBar title="TestApp">
      <StackLayout orientation="horizontal">
        <Image src="~/images/logo.png" width="40" height="40"></Image>
        <Label text="NativeScript" fontSize="24" verticalAlignment="center" />
      </StackLayout>
    </ActionBar>
    <StackLayout
      orientation="vertical"
      height="100%"
      verticalAlignment="center"
      backgroundColor="lightgray"
    >
      <!-- Social -->
      <Image
        src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png"
        width="100"
        stretch="aspectFit"
        class="m-y-20"
      />
      <Button
        text="Facebook"
        @tap="onButtonTap"
        backgroundColor="#3b5998"
        color="white"
        width="300"
      />
      <Button text="Google" @tap="onButtonTap" backgroundColor="#DB4437" color="white" width="300" />

      <!-- Separator -->
      <StackLayout orientation="horizontal" horizontalAlignment="center" class="orStack">
        <StackLayout class="hr orLine" width="100"></StackLayout>
        <Label text="Or" class="orLabel" />
        <StackLayout class="hr orLine" width="100"></StackLayout>
      </StackLayout>

      <!-- Mail -->
      <StackLayout width="300">
        <StackLayout class="input-field">
          <TextField
            class="input"
            hint="Email"
            keyboardType="email"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.email"
            returnKeyType="next"
            @returnPress="focusPassword()"
          ></TextField>
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>

        <StackLayout class="input-field">
          <TextField
            ref="password"
            class="input"
            hint="Password"
            secure="true"
            v-model="user.password"
            :returnKeyType="isLoggingIn ? 'done' : 'next'"
            @returnPress="focusConfirmPassword()"
          ></TextField>
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>

        <StackLayout v-show="!isLoggingIn" class="input-field">
          <TextField
            ref="confirmPassword"
            class="input"
            hint="Confirm password"
            secure="true"
            v-model="user.confirmPassword"
            returnKeyType="done"
          ></TextField>
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>

        <Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="submit()" class="m-t-20"></Button>
        <Label
          v-show="isLoggingIn"
          text="Forgot your password?"
          class="login-label"
          @tap="forgotPassword()"
          horizontalAlignment="center"
        ></Label>

        <Label class="login-label sign-up-label" @tap="toggleForm()" horizontalAlignment="center">
          <FormattedString>
            <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
            <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
          </FormattedString>
        </Label>
      </StackLayout>
    </StackLayout>
  </Page>
</template>
     
<script lang="ts">
import { alert, prompt } from "tns-core-modules/ui/dialogs";

export default {
  data() {
    return {
      actionBarHidden: true,
      isLoggingIn: true,
      user: {
        email: undefined,
        password: undefined,
        confirmPassword: undefined
      }
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      this.userService
        .login(this.user)
        .then(() => {
          this.router.navigate(["/home"]);
        })
        .catch(() => {
          this.alert("Unfortunately we could not find your account.");
        });
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
      }
      this.userService
        .register(this.user)
        .then(() => {
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.alert("Unfortunately we were unable to create your account.");
        });
    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.userService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alertMsg(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.alertMsg(
                "Unfortunately, an error occurred resetting your password."
              );
            });
        }
      });
    },

    focusPassword() {
      this.refs.password.nativeElement.focus();
    },

    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.refs.confirmPassword.nativeElement.focus();
      }
    },

    alertMsg(message) {
      return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>
     
<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }

    .input-field {
        margin-bottom: 15;
    }

    .input {
        font-size: 16;
        placeholder-color: #A8A8A8;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: 
        #000000;
    }

    .orStack {
        margin-top: 20;
        margin-botton: 20;
    }

    .orLabel {
        margin-left: 20;
        margin-right: 20;
    }
</style>