import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { Observable } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(SERVICES.AUTH_SERVICE) private authClient: ClientProxy,
    @Inject(SERVICES.CLASS) private classClient: ClientProxy,
    @Inject(SERVICES.STUDENT) private studentClient: ClientProxy,
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API from gateway service' };
  }

  // Auth Service Methods
  signUp(userDto: any): Observable<any> {
    return this.authClient.send('signUp', userDto);
  }

  logIn(loginDto: any): Observable<any> {
    return this.authClient.send('logIn', loginDto);
  }

  getProfile(user: any): Observable<any> {
    return this.authClient.send('getProfile', user);
  }

  // Class Service Methods
  getClass(): Observable<any> {
    return this.classClient.send('getClass', {});
  }

  getClassById(id: string): Observable<any> {
    return this.classClient.send('getClassById', id);
  }

  postClass(classDto: any): Observable<any> {
    return this.classClient.send('postClass', classDto);
  }

  deleteClass(id: string): Observable<any> {
    return this.classClient.send('deleteClass', id);
  }

  // Student Service Methods
  getAllStudents(filterDto: any): Observable<any> {
    return this.studentClient.send('getAllStudents', filterDto);
  }

  getStudentById(id: string): Observable<any> {
    return this.studentClient.send('getStudentById', id);
  }

  postStudent(studentDto: any): Observable<any> {
    return this.studentClient.send('postStudent', studentDto);
  }

  putStudent(id: string, studentDto: any): Observable<any> {
    return this.studentClient.send('putStudent', { id, studentDto });
  }

  patchStudent(id: string, studentDto: any): Observable<any> {
    return this.studentClient.send('patchStudent', { id, studentDto });
  }

  deleteStudent(id: string): Observable<any> {
    return this.studentClient.send('deleteStudent', id);
  }
}
