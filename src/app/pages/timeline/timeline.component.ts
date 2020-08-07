import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
	posts: IPost[];
	currentPage: number = 1;
	perPage: number = 10;
	total: number;

	isBusy: boolean = false;

	constructor(private postService: PostService) {
		this.posts = [];
	}

	ngOnInit(): void {
		this.getAll(this.currentPage, this.perPage);
	}

	getAll(page: number, perPage: number): void {
		this.isBusy = true;

		this.postService.getTimeline(page, perPage).pipe(first()).subscribe(
			(next) => {
				this.posts.push(...next.data.posts);
				this.currentPage = next.meta.current_page;
				this.perPage = next.meta.per_page;
				this.total = next.meta.total;

				if (this.total > this.posts.length)
					this.isBusy = false;
			}
		);
	}

	onCreated(post: IPost): void {
		this.posts.unshift(post);
	}

	onDeleted(id: number): void {
		this.posts = this.posts.filter((post) => post.id !== id);
	}

	onLoadMore(event): void {
		this.getAll(this.currentPage + 1, this.perPage);
	}
}