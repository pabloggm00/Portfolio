import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { TranslatePipe } from '../../../core/translate.pipe';



@Component({
  selector: 'app-project-card',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './project-card-component.html',
  styleUrl: './project-card-component.scss'
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() isWebApp?: boolean = true;
}
