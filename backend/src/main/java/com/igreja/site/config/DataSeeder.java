package com.igreja.site.config;

import com.igreja.site.model.*;
import com.igreja.site.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Popula o banco com dados de exemplo na primeira execucao,
 * apenas para o site nao nascer vazio. Substitua pelos
 * conteudos reais (textos, imagens, videos) quando estiverem prontos.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final PregadorRepository pregadorRepository;
    private final PregacaoRepository pregacaoRepository;
    private final EventoRepository eventoRepository;
    private final ServicoRepository servicoRepository;

    public DataSeeder(PregadorRepository pregadorRepository,
                       PregacaoRepository pregacaoRepository,
                       EventoRepository eventoRepository,
                       ServicoRepository servicoRepository) {
        this.pregadorRepository = pregadorRepository;
        this.pregacaoRepository = pregacaoRepository;
        this.eventoRepository = eventoRepository;
        this.servicoRepository = servicoRepository;
    }

    @Override
    public void run(String... args) {
        if (pregadorRepository.count() == 0) {
            Pregador p1 = pregadorRepository.save(new Pregador(
                    "Pastor João Silva", "Pastor Titular",
                    "Texto de biografia a ser fornecido.", null));
            Pregador p2 = pregadorRepository.save(new Pregador(
                    "Pastora Maria Souza", "Pastora Auxiliar",
                    "Texto de biografia a ser fornecido.", null));

            Pregacao s1 = new Pregacao();
            s1.setTitulo("A Fé que Move Montanhas");
            s1.setData(LocalDate.now().minusDays(7));
            s1.setTema("Fé");
            s1.setDescricao("Texto/descrição a ser fornecido.");
            s1.setPregador(p1);
            pregacaoRepository.save(s1);

            Pregacao s2 = new Pregacao();
            s2.setTitulo("Restaurando a Família");
            s2.setData(LocalDate.now().minusDays(14));
            s2.setTema("Família");
            s2.setDescricao("Texto/descrição a ser fornecido.");
            s2.setPregador(p2);
            pregacaoRepository.save(s2);
        }

        if (eventoRepository.count() == 0) {
            Evento futuro = new Evento();
            futuro.setTitulo("Culto de Celebração de Aniversário");
            futuro.setData(LocalDate.now().plusDays(20));
            futuro.setHorario("19h00");
            futuro.setLocal("Templo Sede");
            futuro.setDescricao("Descrição a ser fornecida.");
            futuro.setRealizado(false);
            eventoRepository.save(futuro);

            Evento passado = new Evento();
            passado.setTitulo("Conferência de Louvor e Adoração");
            passado.setData(LocalDate.now().minusMonths(2));
            passado.setHorario("19h00");
            passado.setLocal("Templo Sede");
            passado.setDescricao("Descrição a ser fornecida.");
            passado.setRealizado(true);
            eventoRepository.save(passado);
        }

        if (servicoRepository.count() == 0) {
            Servico culto = new Servico();
            culto.setNome("Culto de Celebração");
            culto.setDescricao("Descrição a ser fornecida.");
            culto.setHorario("Domingos às 18h");
            culto.setIcone("cross");
            servicoRepository.save(culto);

            Servico escola = new Servico();
            escola.setNome("Escola Bíblica Dominical");
            escola.setDescricao("Descrição a ser fornecida.");
            escola.setHorario("Domingos às 09h");
            escola.setIcone("book");
            servicoRepository.save(escola);

            Servico infantil = new Servico();
            infantil.setNome("Ministério Infantil");
            infantil.setDescricao("Descrição a ser fornecida.");
            infantil.setHorario("Domingos às 18h");
            infantil.setIcone("heart");
            servicoRepository.save(infantil);
        }
    }
}
