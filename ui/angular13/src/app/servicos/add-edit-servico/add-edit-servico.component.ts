import { Component, Input, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-add-edit-servico',
  templateUrl: './add-edit-servico.component.html',
  styleUrls: ['./add-edit-servico.component.css']
})
export class AddEditServicoComponent implements OnInit {

  constructor(private apiService:ApicallService) { }

  @Input() servico: any;

  ngOnInit(): void {
  }

}
