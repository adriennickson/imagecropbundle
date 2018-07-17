<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Image;
use AppBundle\Form\DeleteForm;
use AppBundle\Form\TestForm;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');

        $image = $em->getRepository(Image::class)->findAll()[0] ?? new Image();
        $form = $this->createForm(TestForm::class, $image);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($image);
            $em->flush($image);
        }

        // replace this example code with whatever you need
        return $this->render('index.html.twig', [
            'form' => $form->createView(),
            'image' => $image,
        ]);
    }
}
