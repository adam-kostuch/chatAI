import axios from 'axios';
import { RegistrationProps } from '../types';

class ChattieApiClient {
  public async openai(message: string): Promise<string> {
    const response = await axios.post('http://localhost:8090/openai', {
      message,
    });

    return response.data;
  }

  public async login(idToken: string) {
    const response = await axios.post(
      'http://localhost:8090/authentication/login',
      { idToken },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  }

  public async registration({
    displayName,
    email,
    password,
  }: RegistrationProps) {
    const response = await axios.post(
      'http://localhost:8090/authentication/registration',
      { displayName, email, password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  }

  public async signOut() {
    const response = await axios.get(
      'http://localhost:8090/authentication/signOut'
    );

    return response;
  }

  public async changePassword() {
    const response = await axios.get(
      'http://localhost:8090/authentication/changePassword'
    );

    return response;
  }
}

export default ChattieApiClient;
