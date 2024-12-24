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

  actions: {
    SET_STUDENT_RA(studentRA: number) {
      this.ra = studentRA;
    },
    SET_STUDENT_DETAILS(student: StudentState) {
      this.ra = student.ra;
      this.name = student.name;
      this.email = student.email;
      this.cpf = student.cpf;
    },
    GET_STUDENT() {
      return {
        ra: this.ra,
        name: this.name,
        email: this.email,
        cpf: this.cpf,
      };
    },
    CLEAR_STUDENT() {
      this.ra = 0;
      this.name = "";
      this.email = "";
      this.cpf = "";
    },
  },
});
