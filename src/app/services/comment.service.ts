import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SnackBarService } from './snack-bar.service';
import { IPaginate } from '../models/paginate';
import { IComments, IComment } from '../models/comment';
import { IPost } from '../models/post';
import { commentsUrl } from './urls';

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

	public getAll(postId: number, page: number, perPage: number): Observable<IPaginate<IComments>> {
		// Get all comments from ther server
		return this.http.get<IPaginate<IComments>>(`${commentsUrl}?post_id=${postId}&page=${page}&per_page=${perPage}`).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public create(comment: IComment, post: IPost): Observable<IComment> {
		// Create a comment to the given post
		return this.http.post<IComment>(commentsUrl, {
			body: comment.body,
			post_id: post.id
		}).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public update(comment: IComment): Observable<any> {
		// Update a comment data
		return this.http.put(`${commentsUrl}/${comment.id}`, {
			body: comment.body
		}).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				if (error.status === 403)
					error.error.message = 'Unauthorized.';

				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}

	public delete(id: number): Observable<any> {
		// Delete a comment
		return this.http.delete(`${commentsUrl}/${id}`).pipe(tap(
			(next) => { },
			(error) => {
				// Show notification on error
				if (error.status === 403)
					error.error.message = 'Unauthorized.';

				this.snackBarService.showSnackBar(3000, error.error);
			}
		));
	}
}