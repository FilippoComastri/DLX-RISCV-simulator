import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export type Documentation = {name: string, type: string, syntax: string, description: string};

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.sass']
})
export class DocumentationComponent implements OnInit {

  documentation: Documentation[];
  search: string = '';

  get documentationFiltered() {
    let upSearch = this.search.toUpperCase();
    return this.documentation.filter(val =>
      val.name.startsWith(upSearch) ||
      val.description.toUpperCase().includes(upSearch)
    ).sort((a,b) =>
      a.name.startsWith(upSearch)
        ? b.name.startsWith(upSearch)
          ? a.name.localeCompare(b.name)
          : -1
        : b.name.startsWith(upSearch)
          ? 1
          : a.name.localeCompare(b.name)
    );
  }

  constructor(route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.documentation = data.documentation
    })
  }

  ngOnInit() { }

}
