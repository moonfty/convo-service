import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { getFirestore } from 'firebase-admin/firestore';
  import { initializeApp } from 'firebase-admin/app';
  import { getAuth } from 'firebase-admin/auth';
  import * as _ from 'lodash';
  
  initializeApp();
  
  @Injectable()
  export class FirebaseService {
    public readonly db = getFirestore();
  
    async getFollowers(id:string) {
      const snapshot = await this.db.collection('users').doc(id).get();
      const user_data = snapshot.data();
      const followers = user_data.followers 
      return followers;
    }
  }
  