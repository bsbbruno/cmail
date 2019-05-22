import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/models/email';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { PageDataService } from 'src/app/services/page-data.service';

@Component({
  selector: 'cmail-detalhe-email',
  templateUrl: './detalhe-email.component.html',
  styles: []
})
export class DetalheEmailComponent implements OnInit {

  email: Email;

  constructor(private route: ActivatedRoute, 
              private service:EmailService,
              private pageService: PageDataService ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.email = this.service.getById(id);      
    
    this.pageService.defineTitulo('Detalhe - CMail');
  }

}
