import { defineStore } from "pinia";

interface StudentState {
  ra: number;
  name: string;
  email: string;
  cpf: string;
}

export const useStudentStore = defineStore("student", {
  state: (): StudentState => ({
    ra: 0,
    name: "",
    email: "",
    cpf: "",
  }),
  getters: {},

  actions: {
    SET_STUDENT_RA(studentRA: number) {
      this.ra = studentRA;
    },
  },
});
