import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Sort, SortDirection } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Registration } from '../interfaces/registration.interface';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Registration>;

  @ViewChild("inputSearch", { static: true, read: MatInput })
  inputSearch: MatInput;

  public static count = 1;
  public form: FormGroup;
  public tableData = new MatTableDataSource<Registration>([]);
  public columnsToDisplay: string[] = ["id", "name", "phone", "actions"];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.tableData.data.push({
        id: (MainComponent.count++).toString(),
        name: this.form.get("name").value,
        phone: this.form.get("phone").value
      });
      this.cleanForm();
      this.table.renderRows();
    }
  }

  public cleanForm(): void {
    this.form.reset();
  }

  public filterTableData(event: { target: { value: string } }) {
    const filterValue = event.target.value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  public showEmptyMessage(): string {
    const inputSearchValue = this.inputSearch.value;
    if (inputSearchValue) {
      return `Não foi encontrado nenhum registro com o filtro ${inputSearchValue}`;
    } else {
      return "Nenhum registro cadastrado";
    }
  }

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.tableData.data.sort((obj1, obj2) =>
        this.dataSortFunc(obj1, obj2, sortState.active, sortState.direction)
      );
      this.table.renderRows();
    }
  }

  public removeTableDataElement(element: Registration): void {
    const index = this.tableData.data.findIndex(item => item.id === element.id);
    if (index !== -1) {
      this.tableData.data.splice(index, 1);
      this.table.renderRows();
    }
  }

  private dataSortFunc(
    obj1: Registration,
    obj2: Registration,
    prop: string,
    order: SortDirection
  ): number {
    if (obj1[prop] > obj2[prop]) return order === "asc" ? 1 : -1;
    else if (obj1[prop] < obj2[prop]) return order === "asc" ? -1 : 1;
    else return 0;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }
}
