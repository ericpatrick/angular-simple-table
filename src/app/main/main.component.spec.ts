import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';

describe("MainComponent", () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MatInputModule,
          MatButtonModule,
          MatTableModule,
          MatSortModule,
          MatIconModule,
          BrowserAnimationsModule
        ],
        declarations: [MainComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve criar uma instância do componente e inicializar", () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeTruthy();
    expect(component.form.get("name").value).toBeNull();
    expect(component.form.get("phone").value).toBeNull();
  });

  it("deve submeter o formulário e criar uma nova linha na tabela", () => {
    // given
    component.ngOnInit();
    component.form.setValue({ name: "Name 1", phone: "123" });
    const renderRowsSpy = jest.spyOn(component.table, "renderRows");

    // when
    component.onSubmit();

    //then
    expect(component.tableData.data).toHaveLength(1);
    expect(renderRowsSpy).toHaveBeenCalled();
  });

  it("deve filtrar os dados da tabela", () => {
    // given
    const event = { target: { value: "Full Name" } };

    // when
    component.filterTableData(event);

    // then
    expect(component.tableData.filter).toEqual("full name");
  });

  it("deve mostrar uma mensagem quando não encontrar um registro com o filtro informado", () => {
    // given
    component.inputSearch.value = "fas";

    // when
    const msg = component.showEmptyMessage();

    // then
    expect(msg).toEqual(`Não foi encontrado nenhum registro com o filtro fas`);
  });

  it("deve ordenar os dados da tabela", () => {
    // given
    component.tableData.data.push({ id: "1", name: "XPTO", phone: "123" });
    component.tableData.data.push({ id: "2", name: "ABC", phone: "987" });
    const renderRowsSpy = jest.spyOn(component.table, "renderRows");
    const sortState: Sort = {
      active: "name",
      direction: "asc"
    };

    // when
    component.announceSortChange(sortState);

    // then
    expect(component.tableData.data[0].name).toEqual("ABC");
    expect(component.tableData.data[1].name).toEqual("XPTO");
    expect(renderRowsSpy).toHaveBeenCalled();
  });

  it("deve remover itens da tabela", () => {
    // given
    component.tableData.data.push({ id: "1", name: "XPTO", phone: "123" });
    component.tableData.data.push({ id: "2", name: "ABC", phone: "987" });
    const renderRowsSpy = jest.spyOn(component.table, "renderRows");

    // when
    component.removeTableDataElement(component.tableData.data[0]);

    // then
    expect(component.tableData.data).toHaveLength(1);
    expect(renderRowsSpy).toHaveBeenCalled();
  });
});
