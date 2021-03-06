import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule, MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule,
  MatSortModule, MatStepperModule,
  MatTableModule,
  MatTabsModule,
  // tslint:disable-next-line:max-line-length
  MatToolbarModule, MatTreeModule, MatSidenavModule, MatChipsModule, MatGridListModule, MatRadioModule, MatSliderModule, MatExpansionModule, MatSlideToggleModule, MatProgressBarModule, MatPaginatorIntl
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { getDutchPaginatorIntl } from './dutch-paginator-intl';


@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatChipsModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatChipsModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class MaterialModule {
}
