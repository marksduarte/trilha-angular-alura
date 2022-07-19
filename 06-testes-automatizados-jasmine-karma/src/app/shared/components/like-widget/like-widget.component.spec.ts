import { LikeWidgetModule } from './like-widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  // O uso do async - await serve como garantia de que o teste somente será executado após o componente ser compilado.
  // Mesmo que o angular utilizando o webpack consiga fazer o mesmo de forma assíncrona.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ## declarativo
      // declarations: [LikeWidgetComponent],
      // providers: [UniqueIdService],
      // imports: [FontAwesomeModule],

      // ## importando o que foi declarado no módulo
      imports: [LikeWidgetModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges(); // -> dispara o ciclo de vida do Angular: onInit e etc.
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges(); // -> dispara o ciclo de vida do Angular: onInit e etc.
    expect(component.id).toBe(someId);
  });

  /*
  A função it, quando recebe um parâmetro geralmente chamado done, este parâmetro é uma referência para uma função 
  que sinaliza para o teste que ele terminou. 
  É importante que o desenvolvedor chame a função done no momento em que achar adequado, caso contrário o teste 
  nunca terminará e um erro de timeout será disparado.
  */
  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called with done`, (done) => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    // Tem que fazer a chamada após o subscribe
    component.like();
  });

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called with spy`, () => {
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });
});
