<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TaskRepository::class)]
class Task
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: false)]
    #[Assert\NotBlank(message: "El título no puede estar vacío.")]
    #[Assert\Length(min: 3, minMessage: "El título no puede tener menos de caracteres.")]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $completed = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getCompleted(): ?string
    {
        return $this->completed;
    }

    public function setCompleted(?string $completed): static
    {
        $this->completed = $completed;

        return $this;
    }
}
