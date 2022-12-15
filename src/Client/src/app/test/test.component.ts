import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public slug: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
    });
  }

}
