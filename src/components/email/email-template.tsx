import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <button>
      <a href={`http://localhost:3000/auth/verify-account?email=${email}`}>
        Verficar cuenta
      </a>
    </button>
  </div>
);
