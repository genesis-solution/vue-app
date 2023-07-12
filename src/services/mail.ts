import http from '../http-common';

class MailService {
    getTest(heroId: string) {
        return http.get(`/`);
      }

    getHero(heroId: string) {
        return http.get(`/${heroId}`);
    }
}

export const mailService = new MailService();